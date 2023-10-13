import styles from './Button.module.css';

type ButtonProps = {
  type: 'submit' | 'button';
  text: string;
}
const Button = ({type, text}: ButtonProps) => {
  return <button className={styles['button']} type={type}>{text}</button>
}

export default Button;