import React from "react";
import QuestionItem from "./QuestionItem";
import {useEffect, useState} from "react";

function QuestionList() {

  const [question, setQuestion] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((q) => q.json())
    .then((questions) => setQuestion(questions))}, [])


  function handleDeleteClick(id){
    fetch("http://localhost:4000/questions/${id}", { method: "DELETE",})
    .then((d) => d.json())
    .then(() => {
    const removedQuestions = question.filter((q) => q.id !== id);
    setQuestion(removedQuestions)})
  }

  function handleAnserChange(id, newIndex){
    fetch("http://localhost:4000/questions/${id}", {method: "PATCH", headers: {"Content-Type" : "application/json"}, body: JSON.stringify({
      correctIndex : parseInt(newIndex)
    })})
    .then((d) => d.json())
    .then((up) => {
      const updatedQuestions = question.map((q) => {
        if(q.id === up.id) return up; return q;
      });
      setQuestion(updatedQuestions)});
    }
  


  const questionItems = question.map( (q) =>
    <QuestionItem key={q.id} question = {q} onDeleteClick={handleDeleteClick} onAnswerChange={handleAnserChange}/>  
  )
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
