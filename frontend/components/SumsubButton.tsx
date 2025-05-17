'use client'
import { useState, useEffect } from 'react'
import SumsubWebSdk from '@sumsub/websdk-react'
import { proxyAxois } from '@/app/api/axios';

// https://docs.sumsub.com/docs/get-started-with-web-sdk
export default function SumsubButton({ refreshKycFlag, setRefreshKycFlag}: {refreshKycFlag: boolean, setRefreshKycFlag: (refreshKycFlag: boolean) => void}) {
  const [accessToken, setAccessToken] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [kycStatus, setKycStatus] = useState<any>(null);

  const config = {
    lang: 'en',
  }

  const options = {
    addViewportTag: false,
    adaptIframeHeight: true,
  }
  
  const generateAccessToken = async () => {
    try {
      const response = await proxyAxois.get('sumsub/access-token');

      console.log('response', response);
      
      setAccessToken(response.data.token);
      setShowVerification(true);
    } catch (error) {
      console.error('Failed to generate access token:', error);
    }
  }


  const messageHandler = (message: any) => {
    console.log('messageHandler', message);
    // Track session ID when available
    if (message.idDocumentStatus?.reviewResult?.sessionId) {
      const newSessionId = message.idDocumentStatus.reviewResult.sessionId;
      sendSessionIdToBackend(newSessionId);
    }

    setRefreshKycFlag(!refreshKycFlag);
  }

  const sendSessionIdToBackend = async (id: string) => {
    try {
      await fetch('/api/kyc/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: id }),
      });
    } catch (error) {
      console.error('Failed to send session ID:', error);
    }
  }

  const errorHandler = (error: any) => {
    console.log('errorHandler', error);
  }

  return (
    <div>
      {!showVerification ? (
        <button onClick={generateAccessToken} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Start Verification
        </button>
      ) : (
        <div className="">
          {accessToken && <SumsubWebSdk
            accessToken={accessToken}
            expirationHandler={generateAccessToken}
            config={config}
            options={options}
            onMessage={messageHandler}
            onError={errorHandler}
          />}
        </div>
      )}
      {kycStatus && kycStatus.list && kycStatus.list.items && kycStatus.list.items.length > 0 && (
            <div className="p-4 border rounded-lg max-w-md">
              <h3 className="text-lg font-bold mb-3">KYC Information</h3>
              
              <div className="mb-3">
                <h4 className="font-semibold">Personal Information</h4>
                <p>Name: {kycStatus.list.items[0].info.firstName} {kycStatus.list.items[0].info.lastName}</p>
                <p>Date of Birth: {kycStatus.list.items[0].info.dob}</p>
                <p>Nationality: {kycStatus.list.items[0].info.nationality}</p>
                <p>Gender: {kycStatus.list.items[0].info.gender}</p>
              </div>
              
              {kycStatus.list.items[0].info.idDocs && kycStatus.list.items[0].info.idDocs.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-semibold">Document Information</h4>
                  <p>Type: {kycStatus.list.items[0].info.idDocs[0].idDocType}</p>
                  <p>Number: {kycStatus.list.items[0].info.idDocs[0].number}</p>
                  <p>Issued Date: {kycStatus.list.items[0].info.idDocs[0].issuedDate}</p>
                  <p>Valid Until: {kycStatus.list.items[0].info.idDocs[0].validUntil}</p>
                </div>
              )}
              
              {kycStatus.list.items[0].review && (
                <div className="mb-3">
                  <h4 className="font-semibold">Verification Status</h4>
                  <p>Status: {kycStatus.list.items[0].review.reviewStatus}</p>
                  <p>Result: {kycStatus.list.items[0].review.reviewResult.reviewAnswer}</p>
                  <p>Review Date: {kycStatus.list.items[0].review.reviewDate}</p>
                </div>
              )}
            </div>
          )}
    </div>
  )
}
