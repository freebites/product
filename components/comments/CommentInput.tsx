import React, { useState } from 'react'

export interface CommentInputProps {
  onSubmit: (body: string) => void;
}


export const CommentInput: React.FC<CommentInputProps> = ({ onSubmit }) => {
  const [body, setBody] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(body);
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={body} onChange={(e) => setBody(e.target.value)}
        className="input-box"
      />
      <button className="comment-button">Submit</button>
    </form>
  );
};
