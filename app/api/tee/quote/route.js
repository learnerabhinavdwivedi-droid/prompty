import { NextResponse } from 'next/server';
import { TappdClient } from '@phala/dstack-sdk';

export async function GET() {
  try {
    // Attempt to connect to the local TEE endpoint (default: http://localhost:8090)
    const client = new TappdClient();
    
    // Request a TDX/SGX attestation quote
    // You can pass an optional unique nonce or app data (e.g. 'tokenshrink-auth-data')
    const quote = await client.tdxQuote('tokenshrink-auth-data');
    
    return NextResponse.json({
      success: true,
      tee: 'Phala Network / Dstack',
      quote: quote,
    });
  } catch (error) {
    console.error('TEE Attestation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Are you running inside a Trusted Execution Environment (CVM)?'
      },
      { status: 500 }
    );
  }
}
