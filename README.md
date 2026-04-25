# task-manager-api

API REST para gerenciamento de tarefas, desenvolvida com NestJS, TypeScript, TypeORM e SQLite.

Projeto criado como portfólio para demonstrar uso prático de IA no fluxo de desenvolvimento.

---

## Tecnologias

- **NestJS** — framework Node.js para APIs escaláveis
- **TypeScript** — tipagem estática no JavaScript
- **TypeORM** — ORM para mapeamento de entidades e banco de dados
- **SQLite (better-sqlite3)** — banco relacional embutido, sem necessidade de servidor
- **Jest** — testes unitários e de integração
- **Claude (claude.ai)** — assistente de IA utilizado no desenvolvimento

---

## Como rodar localmente

### Pré-requisitos

- Node.js >= 18
- npm >= 9

### Instalação

```bash
git clone https://github.com/mirtesfernanda/task-manager-api.git
cd task-manager-api
npm install
```

### Executar em desenvolvimento

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

### Executar os testes

```bash
npm run test
```

---

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/tasks` | Lista todas as tarefas |
| `GET` | `/tasks/:id` | Busca uma tarefa pelo ID |
| `POST` | `/tasks` | Cria uma nova tarefa |
| `PATCH` | `/tasks/:id/status` | Atualiza o status de uma tarefa |
| `DELETE` | `/tasks/:id` | Remove uma tarefa |

### Exemplos de requisição

**Criar tarefa**
```json
POST /tasks
{
  "title": "Estudar NestJS",
  "description": "Aprender módulos, controllers e services"
}
```

**Atualizar status**
```json
PATCH /tasks/:id/status
{
  "status": "IN_PROGRESS"
}
```

Status disponíveis: `OPEN`, `IN_PROGRESS`, `DONE`

---

## Estrutura do projeto

```
src/
├── tasks/
│   ├── dto/
│   │   └── task.dto.ts          # CreateTaskDto e UpdateTaskStatusDto
│   ├── task.entity.ts           # Entidade Task com TypeORM
│   ├── tasks.controller.ts      # Rotas HTTP
│   ├── tasks.module.ts          # Módulo NestJS
│   ├── tasks.service.ts         # Lógica de negócio
│   └── tasks.service.spec.ts    # Testes unitários
└── app.module.ts                # Módulo raiz com configuração do banco
```

---

## Uso de IA no desenvolvimento

Este projeto foi desenvolvido com **Claude (claude.ai)** como ferramenta central de aprendizado e aceleração, sendo minha primeira aplicação prática com TypeScript e NestJS.

### Como usei o Claude em cada etapa

**Aprendizado de TypeScript**
Por ter background em JavaScript, usei o Claude para entender as diferenças práticas: quando usar `interface` vs `type`, como funcionam os decorators do TypeScript, o que significa `@Injectable()` por baixo dos panos, e como tipar corretamente os retornos assíncronos com `Promise<T>`.

**Estrutura do projeto NestJS**
Pedi ao Claude para explicar a arquitetura de módulos do NestJS (module, controller, service) antes de escrever qualquer linha de código. Entender o padrão antes de implementar evitou retrabalho e tornou o código mais coerente com as convenções do framework.

**TypeORM e entidades**
Ussei o Claude para entender como os decorators `@Entity()`, `@Column()` e `@PrimaryGeneratedColumn()` se traduzem em tabelas SQL, e como configurar o TypeORM com SQLite sem precisar de um servidor de banco de dados.

**Testes com Jest**
Testes com mocks do TypeORM eram completamente novos para mim. O Claude explicou o conceito de mock repositories, como usar `jest.fn()` para simular o comportamento do banco, e como estruturar os `describe` e `it` de forma legível. Escrevi os testes compreendendo cada linha, não apenas copiando.

**Revisão de código**
Usei o Claude para revisar os DTOs e identificar se as validações estavam corretas, e para verificar se os status codes HTTP dos endpoints seguiam as convenções REST (`204 No Content` no DELETE, por exemplo).

### O que aprendi com essa abordagem

Usar IA como par de programação acelerou muito o aprendizado de um stack novo. A diferença em relação a copiar código de tutoriais é que sempre perguntei o *porquê* de cada decisão — o que me deu confiança para adaptar e resolver problemas que não estavam no roteiro inicial.

---

## Commits

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add task entity and TypeORM configuration
feat: add tasks module with CRUD endpoints
test: add unit tests for TasksService
docs: add README with AI-assisted development section
```

---

## Autora

**Mirtes Fernanda Dutra da Silva**
- GitHub: [@mirtesfernanda](https://github.com/mirtesfernanda)
- LinkedIn: [linkedin.com/in/mirtes-fernanda-dutra-da-silva-058aa530a](https://www.linkedin.com/in/mirtes-fernanda-dutra-da-silva-058aa530a/)
