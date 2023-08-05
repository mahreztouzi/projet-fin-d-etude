import React from "react";
import "../index.css";
import Header from "../components/header";
import FAQCard from "../components/faqcard";

const Faq = () => {
  return (
    <div className="bg-gray-50">
      <Header back="true" />
      <div className="h-9/10 flex ">
        <div className="justify-center mt-12 ml-auto mr-auto w-2/3">
          <div className="">
            <h1 className="text-center text-3xl font-medium mt-8 mb-4 antialiased p-5">
              Avez vous des questions ?
            </h1>
          </div>
          <FAQCard
            question="Qui sommes-nous?"
            answer="Nous sommes Mahrez Touzi et Ferhat Khlef, des étudiants préparant notre projet de fin d'études."
          />
          <FAQCard
            question="Comment puis-je créer un cours?"
            answer="Pour créer un cours, vous devez d'abord vous inscrire en tant qu'enseignant. Ensuite, vous pourrez créer des cours à partir de votre profil d'enseignant."
          />
          <FAQCard
            question="Pourquoi cette application a-t-elle été créée?"
            answer="Cette application a été créée dans le but de proposer des cours en ligne accessibles à tous."
          />
          <FAQCard
            question="Quelles sont les technologies utilisées?"
            answer="Les technologies utilisées sont React.js et Axios pour interagir avec notre API e-learning."
          />
          {/* <FAQCard question="How to track delivery?" answer="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Faq;
