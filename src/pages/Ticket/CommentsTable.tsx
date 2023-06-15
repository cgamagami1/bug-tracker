import { DateTime } from "luxon";
import useTable from "../../utils/useTable";
import TableContainer from "../../components/TableContainer";
import trash from "../../assets/trash.svg";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../utils/firebase-config";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button";
import { timestampToDateTime } from "../../utils/date-conversion";
import { useErrorBoundary } from "react-error-boundary";
import { FirebaseError } from "firebase/app";

export type Comment = {
  id: string;
  posterId: string;
  posterName: string;
  profilePicture: string;
  message: string;
  datePosted: DateTime;
}

type CommentTableProps = {
  ticketId: string;
}

const CommentsTable = ({ ticketId }: CommentTableProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();

  const { 
    sortedEntries,
    currentPage, 
    handleOnNewPage,
    firstShownPageButton,
    footerInfo
  } = useTable(comments, 5, { attribute: "datePosted", isReversed: true });

  const fetchComments = async () => {
    const commentSnapshot = await getDocs(collection(db, "tickets", ticketId, "comments"));

    return await Promise.all(commentSnapshot.docs.map(async (document) => {
      const docData = document.data();

      const posterDoc = await getDoc(doc(db, "users", docData.posterId));
      const posterName = posterDoc.exists() ? `${posterDoc.data().firstName} ${posterDoc.data().lastName}` : "Removed Team Member";
      const profilePicture = posterDoc.exists() ? posterDoc.data().profilePicture : "";

      return {
        id: document.id,
        posterId: docData.posterId,
        posterName,
        profilePicture,
        message: docData.message,
        datePosted: timestampToDateTime(docData.datePosted)
      } as Comment;
    }));
  }

  const handleOnAddComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addDoc(collection(db, "tickets", ticketId, "comments"), {
        posterId: user?.uid,
        message: newComment,
        datePosted: serverTimestamp()
      });
    }
    catch (error) {
      if ((error as FirebaseError).code === "permission-denied") showBoundary(error);
    }

    setComments(await fetchComments());
    setNewComment("");
    setIsLoading(false);
  }

  const handleOnDeleteComment = async (comment: Comment) => {
    await deleteDoc(doc(db, "tickets", ticketId, "comments", comment.id));

    setComments(await fetchComments());
  }

  useEffect(() => {
    const getComments = async () => {
      setComments(await fetchComments());
    }
    
    getComments();
  }, []);

  const handleOnNewCommentChange = (e: ChangeEvent<HTMLInputElement>) => setNewComment(e.target.value);

  return (
    <TableContainer title="Comments" currentPage={currentPage} handleOnNewPage={handleOnNewPage} firstShownPageButton={firstShownPageButton} footerInfo={footerInfo}>

      <form className="px-2 pt-4 flex flex-col md:flex-row gap-4 mb-6" onSubmit={handleOnAddComment}>
        <input className="border flex-grow rounded-md px-2 focus:outline-none h-9" type="text" value={newComment} onChange={handleOnNewCommentChange} placeholder="Add a comment..." />
        <Button title="Add Comment" type="submit" isLoading={isLoading} />
      </form>

      {
        sortedEntries.map(comment => (
          <div key={comment.id} className="flex px-2 mb-6 items-start gap-4 justify-between">
            <img className="rounded-full w-10" src={comment.profilePicture} alt="profile picture" />

            <div className="flex-grow">
              <p><span className="font-bold">{ comment.posterName }</span> { comment.datePosted?.toISODate() }</p>
              <p className="inline-block">{ comment.message }</p>
            </div>

            {user?.uid === comment.posterId && <img className="w-4 hover:cursor-pointer" src={trash} alt="trash icon" onClick={() => handleOnDeleteComment(comment)} />}
          </div>
        ))
      }
    </TableContainer>
  );
}

export default CommentsTable;