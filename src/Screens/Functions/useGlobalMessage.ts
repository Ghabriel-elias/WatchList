import {showMessage} from 'react-native-flash-message'

interface GlobalMessageProps {
  message: string,
  type: 'danger' | 'success';
}

export const globalMessage = ({
  message,
  type
}: GlobalMessageProps) => {
  showMessage({
    message: message,
    type: type,
    duration: 3000,
    animated: true,
    // autoHide: true,
    animationDuration: 500,
    floating: true, 
    icon: type
  })
}