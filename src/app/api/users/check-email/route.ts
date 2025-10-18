import { NextRequest, NextResponse } from 'next/server';

const users: Array<{ id: string; name: string; email: string; createdAt: string }> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: 'Email é obrigatório' },
        { status: 400 }
      );
    }

    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      return NextResponse.json(
        { exists: true, message: 'Email já cadastrado' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { exists: false, message: 'Email disponível' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao verificar email:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
