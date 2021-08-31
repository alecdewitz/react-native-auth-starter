import store, { getStore } from '../../store';
import { HIDE_MODAL, SHOW_MODAL } from './types';

export const waveMessageModal = (details) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    modalType: 'waveMessage',
    details,
  });
};

export const ignoreWaveModal = (details, onConfirm) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    modalType: 'ignoreWave',
    details,
    onConfirm,
  });
};

export const newConnectionModal = (details, onConfirm, onCancel) => (dispatch) => {
  const modalIsOpen = getStore().getState().modals.isOpen;
  if (!modalIsOpen) {
    dispatch({
      type: SHOW_MODAL,
      modalType: 'newConnection',
      details,
      onConfirm,
      onCancel,
    });
  }
};

export const newWaveModal = (details, onConfirm, onCancel) => (dispatch) => {
  const modalIsOpen = getStore().getState().modals.isOpen;
  if (!modalIsOpen) {
    dispatch({
      type: SHOW_MODAL,
      modalType: 'newWave',
      details,
      onConfirm,
      onCancel,
    });
  }
};

export const notificationSummaryModal = (details, onConfirm, onCancel) => (dispatch) => {
  dispatch({
    type: SHOW_MODAL,
    modalType: 'notificationSummary',
    details,
    onConfirm,
    onCancel,
  });
};

export const hideModal = () => (dispatch) => {
  const modalIsOpen = getStore().getState().modals.isOpen;
  dispatch({
    type: HIDE_MODAL,
  });
};
