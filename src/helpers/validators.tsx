import React from 'react';
import { isEmail } from 'validator';

export const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

export const validPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export const validName = (value) => {
  if (value.length < 3 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Please enter your full name.
      </div>
    );
  }
};
