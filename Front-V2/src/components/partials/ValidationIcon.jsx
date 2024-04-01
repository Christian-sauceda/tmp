import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ValidationIcon = ({ touched, error }) => {
  return (
    <>
      {touched && error && (
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="absolute right-0 top-1 transform -translate-y-2 mt-4 mr-2 h-5 w-5"
          style={{ color: "red" }}
        />
      )}
      {touched && !error && (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="absolute right-0 top-1 transform -translate-y-2 mt-4 mr-2 h-5 w-5"
          style={{ color: "green" }}
        />
      )}
    </>
  );
};

export default ValidationIcon;
