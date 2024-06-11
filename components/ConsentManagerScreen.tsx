/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { createRef, useEffect } from "react";

const ConsentManagerScreen = ({ authToken, tenantId, path }: { authToken: string; tenantId: string; path: string; }) => {
  const iframeRef = createRef<HTMLIFrameElement>();

  useEffect(() => {
    window.addEventListener('message', (ev) => {
      const cmp = iframeRef.current;
      if (ev.data.event === 'cmpReady' && cmp !== undefined && cmp !== null) {
        cmp.contentWindow?.postMessage({
          partnerToken: authToken,
          partnerProvider: tenantId.substring(0, tenantId.length - 4),
          method: 'SIGN_IN'
        }, '*');
      }
    });
  }, [iframeRef.current, authToken, tenantId]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border-0"
      src={`https://cmp.privacyshire.com?embedded=true&debug=true#${path}`}
    />
  )
}

export default ConsentManagerScreen;