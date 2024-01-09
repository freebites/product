
import React, { useState, useContext } from 'react';
import { comment, PostContext } from '../../context/postContext';
import { View, Text, TextInput, Button } from 'react-native';

export const CommentList = () => {
  const { postData, updatePostData } = useContext(PostContext);
  const [comments, setComments] = useState<comment[]>(postData.comments);
  const [newCommentText, setNewCommentText] = useState('');

  const handleCommentChange = (text) => {
    setNewCommentText(text);
  };

  const handleUpdateComments = (newComments) => {
    updatePostData({
      ...postData,
      comments: [...postData.comments, newComments],
    })
  }

  const handleAddComment = () => {
    // Create a new comment instance
    const newComment: comment = {
      id: comments.length + 1, // You might want to use a more sophisticated way to generate IDs
      username: 'user1', // Assuming a default username or you can get it from user authentication
      body: newCommentText,
      timestamp: new Date(),
    };

    handleUpdateComments(newComment);

    // Update the state with the new comment
    setComments([...comments, newComment]);

    // Clear the input field
    setNewCommentText('');
  };
  return (
    <View>
      {comments.map(comment => (
        <View key={comment.id}>
          <Text>{comment.username}</Text>
          <Text>{comment.body}</Text>
        </View>
      ))}
      <TextInput
        placeholder="Type your comment"
        value={newCommentText}
        onChangeText={handleCommentChange}
      />
      <Button title="Add Comment" onPress={handleAddComment} />
    </View>

  );
}


