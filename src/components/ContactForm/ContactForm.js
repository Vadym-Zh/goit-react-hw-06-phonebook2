import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusContacts } from 'redux/contactsSlicer/contactsSlice';
import { setStatusName } from 'redux/nameSlicer/nameSlice';
import { setStatusNumber } from 'redux/numberSlicer/numberSlice';

import css from './ContactForm.module.css';

export function ContactForm() {
  const contacts = useSelector(state => state.contacts);
  const name = useSelector(state => state.name);
  const number = useSelector(state => state.number);
  const dispatch = useDispatch();

  function hendleChange(event) {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        dispatch(setStatusName(value));
        break;

      case 'number':
        dispatch(setStatusNumber(value));
        break;

      default:
        return;
    }
  }

  function hendleSubmit(evt) {
    evt.preventDefault();

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contact.`);
    }
    dispatch(setStatusContacts({ name, number }));

    dispatch(setStatusName(''));
    dispatch(setStatusNumber(''));
  }

  return (
    <form onSubmit={hendleSubmit} className={css.formLabel}>
      <label>
        Name
        <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={hendleChange}
          id={nanoid()}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder="Add contact name"
          required
          className={css.formInput}
        />
      </label>
      <br />
      <label>
        Number
        <br />
        <input
          type="tel"
          name="number"
          value={number}
          onChange={hendleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Add contact tel"
          required
          className={css.formInput}
        />
      </label>
      <br />

      <button type="submit" className={css.formButton}>
        Add contact
      </button>
    </form>
  );
}
