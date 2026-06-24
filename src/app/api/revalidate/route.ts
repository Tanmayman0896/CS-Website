import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token || token !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const tag: string = body.tag ?? 'team';

  if (tag === 'team') {
    revalidatePath('/team', 'page');
  } else if (tag === 'events') {
    revalidatePath('/events', 'layout');
  }

  return NextResponse.json({ revalidated: true, tag });
}
