import { useDispatch, useSelector } from 'react-redux';
import { setDeleteContacts } from 'redux/contactsSlicer/contactsSlice';
import { nanoid } from 'nanoid';

import css from './ContactList.module.css';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts);
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();

  function onDelete(index) {
    dispatch(setDeleteContacts(index));
  }

  function findContact() {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filters.toLowerCase())
    );
  }

  const contactsData = findContact();

  return (
    <ul className={css.listContainer}>
      {contactsData.map(({ name, number }, index) => (
        <li key={nanoid()} className={css.listItem}>
          <span className={css.contactName}> {name} :</span>
          <span className={css.contactNumber}>{number} </span>

          <button
            type="button"
            onClick={() => onDelete(index)}
            key={index}
            className={css.deleteButton}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
