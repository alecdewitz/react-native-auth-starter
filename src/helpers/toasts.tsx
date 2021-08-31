import { format } from 'date-fns';

const DEFAULT_TOAST_DURATION = 100000;

const genericToast = (message, options = {}, connected = false) => {
  const dismissToast = (e, t) => {
    e.preventDefault();
    alert('generic toast');
  };
};

export const newMessageToast = (message, connection) => {
  const timestamp = new Date(message.timestamp);
  alert('new message toast');

  const viewMessage = (e, t) => {
    e.preventDefault();
    alert('view message and navigate to message');
  };

  const closeToast = (e, t) => {
    e.preventDefault();
    e.stopPropagation();
    alert('close toast');
  };
};

export const newWaveToast = (wave, currentUser) => {
  const timestamp = new Date(wave.timestamp);

  const action = (e, t) => {
    e.preventDefault();
    alert('generic toast');

    // toast.dismiss(t.id);
    if (wave.connection.status === 'PENDING') {
      // history.push(`/connections/requests`);
    } else if (wave.connection.status === 'ACCEPTED') {
      // history.push(`/connections/messages/${wave.connection.slug}`);
    }
  };

  const connectionUser =
    wave.connection.initiator.id === currentUser.id
      ? wave.connection.receiver
      : wave.connection.initiator;

  alert('new wave from ' + connectionUser.name + ' toast');
};

export const waveToast = (message, connected = false) => {
  return genericToast(message, { icon: '👋' }, connected);
};

export const messageOnlyToast = (message, connected = false) => {
  return genericToast(message, {}, connected);
};
