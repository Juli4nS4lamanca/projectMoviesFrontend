import { useMessage } from '@/utils/MessageContext.jsx';

const Message = () => {
  const { message, type } = useMessage();

  if (!message) return null;

  const styles = {
    error: 'alert alert-danger message',
    success: 'alert alert-success message',
    delete: 'alert alert-primary message'
  };

  return (
    <div className={styles[type]} role="alert">{message}</div>
  )
};

export default Message;
