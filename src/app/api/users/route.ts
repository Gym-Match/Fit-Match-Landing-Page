import { NextRequest, NextResponse } from 'next/server';

// Simulando um banco de dados em memória
const users: Array<{ 
  id: string; 
  name: string; 
  email: string; 
  createdAt: string;
  referralCode: string;
  referredBy?: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, referralCode } = body;

    // Validações básicas
    if (!name || !email) {
      return NextResponse.json(
        { message: 'Nome e email são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se email já existe
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já está em uso' },
        { status: 400 }
      );
    }

    // Gerar código de indicação único
    const generateReferralCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    let userReferralCode = generateReferralCode();
    
    // Garantir que o código seja único
    while (users.some(user => user.referralCode === userReferralCode)) {
      userReferralCode = generateReferralCode();
    }

    // Verificar se o código de indicação fornecido é válido
    let referredBy = undefined;
    if (referralCode) {
      const referrer = users.find(user => user.referralCode === referralCode.toUpperCase());
      if (referrer) {
        referredBy = referrer.id;
      }
    }

    // Criar novo usuário
    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      createdAt: new Date().toISOString(),
      referralCode: userReferralCode,
      referredBy
    };

    users.push(newUser);

    return NextResponse.json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      referralCode: newUser.referralCode,
      referredBy: newUser.referredBy,
      message: 'Usuário cadastrado com sucesso!'
    }, { 
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
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
