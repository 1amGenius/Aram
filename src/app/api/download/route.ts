import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { url } = await request.json()

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            )
        }

        // Handle regular URL (images and videos)
        try {
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept': '*/*',
                }
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            
            const contentType = response.headers.get('content-type') || 'application/octet-stream'
            const arrayBuffer = await response.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            
            return new NextResponse(buffer, {
                headers: {
                    'Content-Type': contentType,
                    'Content-Disposition': `attachment; filename="${url.split('/').pop()?.split('?')[0] || 'file'}"`,
                    'Access-Control-Allow-Origin': '*',
                },
            })
        } catch (error) {
            console.error('Download error:', error)
            return NextResponse.json(
                { error: error instanceof Error ? error.message : 'Failed to download file' },
                { status: 500 }
            )
        }
    } catch (error) {
        console.error('Download error:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to download' },
            { status: 500 }
        )
    }
} 