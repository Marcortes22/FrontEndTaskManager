import styles from './styles/TodoEmpyHerlper.module.css';
export default function TodoEmptyHelper({
  title,
  description,
  photo,
}: {
  title: string;
  description: string;
  photo: string;
}) {
  return (
    <>
      <div className={styles.HelperContainer}>
        <div className={styles.HelperInformation}>
          <img className={styles.Photo} src={photo} />
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}
