import { useState } from "react";
import { db } from "../db";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

function HandleComments({ movieId }) {
    const date = new Date().toDateString();
    let comments = useLiveQuery(() => db.comments.where('movieId').equals(movieId).toArray())

    async function addComment(event) {
        event.preventDefault()
        const data = Object.fromEntries((new FormData(event.target)).entries())
        const content = data.content
        try {
            const id = await db.comments.add({
                content,
                movieId,
                date
            })
        } catch (error) {
            console.log(error)
        }
    }
    async function removeComment(id) {
        try {
            await db.comments.delete(id)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="w-full bg-gray-100">
                <h2 className="text-2xl font-bold text-center my-5">Comments</h2>
                <div className="w-full my-5">
                    {comments && comments?.map(({ content, id, date }) => (
                        <article key={id} className="w-full md:w-2/3 mx-auto bg-white border border-gray-200 rounded-lg shadow">
                            <div className="flex justify-between mb-3 text-xs text-gray-700 p-2 bg-gray-100">
                                <p>{date}</p>
                                <i onClick={() => removeComment(id)} title="remove comment" className="hover:cursor-pointer">🗑️</i>
                            </div>

                            <p className="mb-2 text-xs text-gray-400 p-3">{content}</p>

                        </article>
                    ))}
                </div>
                <form onSubmit={addComment} className="w-full md:w-2/3 mx-auto">
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="px-4 py-2 bg-white rounded-t-lg">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea name="content" id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 " placeholder="Write a comment..." required />
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t">
                            <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200">
                                Post comment
                            </button>
                        </div>
                    </div>
                </form >
            </div >
        </>
    )
}
export default HandleComments;