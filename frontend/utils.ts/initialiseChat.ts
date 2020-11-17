import WebSocketInstance from '@/websocket';

export const initialiseChat = (chatId: number, firstMessageCallback?: () => void): void => {
  waitForSocketConnection(() => {
    if (firstMessageCallback) {
      firstMessageCallback();
    }
    WebSocketInstance.fetchMessages(chatId);
  });
  WebSocketInstance.connect(chatId);
};

const waitForSocketConnection = (callback: () => void): void => {
  setTimeout(function () {
    if (WebSocketInstance.state() === 1) {
      console.log('Connection is made');
      callback();
    } else {
      console.log('wait for connection...');
      waitForSocketConnection(callback);
    }
  }, 100);
};