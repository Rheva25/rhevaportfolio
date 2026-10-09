import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { quotesPublicRepository } from '@/lib/repositories/quotesPublic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const slug = searchParams.get('slug');
    const format = searchParams.get('format'); // "ig" for Instagram portrait
    
    let quoteText = "Error 404: Quote Not Found";
    let authorText = "iqbalabs";

    if (slug) {
      const quoteData = await quotesPublicRepository.getBySlug(slug);
      if (quoteData) {
        quoteText = quoteData.quote;
        if (quoteData.author) authorText = quoteData.author;
      }
    }

    const isIG = format === 'ig';
    const width = isIG ? 1080 : 1200;
    const height = isIG ? 1350 : 630;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#09090b', // zinc-950
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle background gradients */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              width: '50%',
              height: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-20%',
              right: '-10%',
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(0,0,0,0) 70%)',
            }}
          />

          {/* Quote content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isIG ? '80px 100px' : '60px 120px',
              textAlign: 'center',
              maxWidth: '90%',
            }}
          >
            <span
              style={{
                fontSize: '80px',
                color: '#3f3f46', // zinc-700
                fontFamily: 'serif',
                marginBottom: '20px',
              }}
            >
              "
            </span>
            <p
              style={{
                fontSize: isIG ? '54px' : '48px',
                fontWeight: 600,
                color: '#f4f4f5', // zinc-100
                lineHeight: 1.4,
                fontFamily: 'sans-serif',
                marginBottom: '40px',
                textAlign: 'center',
                wordWrap: 'break-word',
              }}
            >
              {quoteText}
            </p>
          </div>

          {/* Watermark at bottom center */}
          <div
            style={{
              position: 'absolute',
              bottom: isIG ? '80px' : '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '10px 24px',
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '20px',
                  color: '#a1a1aa', // zinc-400
                  fontFamily: 'monospace',
                  letterSpacing: '2px',
                }}
              >
                {authorText.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width,
        height,
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
