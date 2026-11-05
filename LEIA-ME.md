# TEC Soluções — projeto inicial

Este pacote é a fundação técnica inicial do TEC Soluções. Ele ainda **não é o sistema financeiro completo** e não deve receber dados reais nesta fase.

## Tecnologias previstas
- HTML, CSS e JavaScript (módulos ES)
- Firebase Authentication (e-mail e senha)
- Cloud Firestore
- Cloudflare Pages para hospedagem
- GitHub para histórico do código

## 1. Preparar o Firebase
1. Crie um projeto no Firebase Console.
2. Adicione um aplicativo Web e copie a configuração fornecida.
3. Ative Authentication > Sign-in method > E-mail/senha.
4. Crie manualmente sua única conta de usuário.
5. Ative o Cloud Firestore em modo de produção.
6. Publique o conteúdo de `firestore.rules` nas regras do Firestore.
7. Copie `js/firebase-config.example.js` para `js/firebase-config.js` e preencha os campos com a configuração Web do seu projeto.

Importante: a configuração Web do Firebase identifica o projeto, mas não protege os dados. A proteção é feita pelas regras do Firestore e pelas configurações do Authentication. Não compartilhe senhas, chaves de conta de serviço ou credenciais administrativas.

Para manter somente um usuário, não deixe uma tela pública de cadastro no aplicativo. Crie a conta no Console e desative o método de criação pública de contas na experiência do aplicativo. As regras atuais isolam os dados por UID, mas não substituem a configuração de acesso.

## 2. Visualizar localmente
Para testar com Firebase, publique os arquivos em um servidor local estático (por exemplo, a extensão Live Server do VS Code) ou em uma hospedagem HTTPS. Não abra `index.html` diretamente com `file://`, pois os módulos JavaScript podem ser bloqueados pelo navegador.

## 3. Publicar no Cloudflare Pages
1. Envie os arquivos para um repositório privado no GitHub.
2. No Cloudflare, crie um projeto Pages conectado ao repositório.
3. Para este projeto estático, use a pasta raiz como diretório de saída; não há etapa de build.
4. Configure o domínio `pages.dev` fornecido pelo Cloudflare.

## 4. Segurança e limites
- Mantenha o projeto Firebase no plano Spark e não habilite faturamento.
- O Firestore oferece cotas gratuitas; ao excedê-las, o serviço pode ficar indisponível até a renovação da cota.
- O backup/restore será implementado no próprio aplicativo. Não presumir que backup gerenciado do Firestore seja gratuito.
- Antes de usar dados reais, testar as regras com usuários autenticados e não autenticados.
- Nunca colocar credenciais administrativas no navegador.

## 5. Próxima etapa de desenvolvimento
1. Validar a conexão do login.
2. Modelar as coleções e documentos do banco.
3. Implementar operações financeiras com consistência e histórico.
4. Construir cada módulo e testar cenários de ponta a ponta.

## Estrutura
- `index.html`: estrutura da interface
- `css/styles.css`: aparência responsiva
- `js/app.js`: inicialização e autenticação
- `js/firebase-config.example.js`: modelo de configuração Firebase
- `firestore.rules`: regras iniciais de acesso
- `manifest.webmanifest`: metadados para instalação PWA
