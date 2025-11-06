import { useState, useRef, useCallback, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const useRecaptcha = () => {
  const [captchaToken, setCaptchaToken] = useState('');
  const recaptchaRef = useRef(null);

  const handleRecaptcha = useCallback((token) => {
    setCaptchaToken(token || '');
  }, []);

  useEffect(() => {
    const refreshCaptcha = () => {
      if (recaptchaRef.current && captchaToken) {
        recaptchaRef.current.reset();
        setCaptchaToken('');
      }
    };

    let tokenRefreshTimeout = null;

    if (captchaToken) {
      tokenRefreshTimeout = setTimeout(refreshCaptcha, 110000); // 110 seconds
    }

    return () => {
      if (tokenRefreshTimeout) {
        clearTimeout(tokenRefreshTimeout);
      }
    };
  }, [captchaToken]);

  return { captchaToken, recaptchaRef, handleRecaptcha };
};

export default useRecaptcha;
