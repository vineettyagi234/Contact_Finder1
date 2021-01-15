import React, { useRef, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContacts, clearFilter, filtered } = contactContext;
  const text = useRef("");

  // to keep the filter all time empty
  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <div>
      <input
        type="text"
        ref={text}
        placeholder="Filter Contact.."
        onChange={onChange}
      ></input>
    </div>
  );
};

export default ContactFilter;
