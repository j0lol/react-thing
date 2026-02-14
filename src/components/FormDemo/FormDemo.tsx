import { type FormEvent, useState } from "react";
import { Temporal } from "temporal-polyfill"; // Required because as of writing, Temporal is unavailable in Safari
import styles from "./FormDemo.module.css";

function FormDemo() {
  let [birthday, setBirthday] = useState<string | null>(null);
  let [formData, setFormData] = useState<FormData | null>(null);

  function getDaysUntilBirthday(birthdate: string) {
    const now = Temporal.Now.plainDateISO();

    let bdate = Temporal.PlainDate.from(birthdate).with({ year: now.year });

    if (Temporal.PlainDate.compare(bdate, now) === -1) {
      bdate = bdate.with({ year: now.year + 1 });
    }

    const dur = bdate.since(now);
    const durDays = dur.days;

    if (durDays == 0) {
      return <span>Happy Birthday!</span>;
    } else if (durDays == 1) {
      return <span>{dur.days.toString()} day until your birthday!</span>;
    } else {
      return <span>{dur.days.toString()} days until your birthday!</span>;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    setFormData(formData);

    setBirthday(formData.get("birthday")! as string);
  }

  return (
    <div className={styles.wrapper}>
      <p>FormDemo</p>

      <form onSubmit={handleSubmit}>
        <label>
          Birthday:&nbsp;
          <input name="birthday" type="date" />
        </label>

        <input type="submit" />
      </form>

      <output className={styles.birthday}>
        {birthday ? getDaysUntilBirthday(birthday) : "..."}
      </output>
      <output>
        <pre>
          FormData: {formData ? JSON.stringify(Object.fromEntries(formData)) : "{}"}</pre>
      </output>
    </div>
  );
}

export default FormDemo;
