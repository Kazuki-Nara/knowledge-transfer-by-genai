FROM public.ecr.aws/docker/library/node:22-bullseye-slim AS builder

WORKDIR /project


COPY backend/api/package.json backend/api/package-lock.json /project/backend/api/

WORKDIR /project/backend/api
RUN npm ci

COPY backend/api /project/backend/api
WORKDIR /project/backend/api
RUN npm run build

FROM public.ecr.aws/docker/library/node:22-bullseye-slim AS runner

# Lambda Web Adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter

ENV PORT=8080 \
    NODE_ENV=production \
    AWS_LWA_INVOKE_MODE=response_stream

WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=builder /project/backend/api/dist          ./dist
COPY --from=builder /project/backend/api/package.json  ./package.json
COPY --from=builder /project/backend/api/node_modules  ./node_modules

CMD ["npm", "run", "start:prod"]
