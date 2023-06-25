import { readFileSync } from 'fs';
import { join } from 'path';


import neo4j from 'neo4j-driver';
import { createYoga } from 'graphql-yoga';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { NextApiRequest, NextApiResponse } from 'next';

const schemaFielName = 'schema.graphql';
const schemaPath = join(process.cwd(), 'app', 'api', 'graphql', schemaFielName)

// TODO: Need file check and raise error when something wrong happens
const typeDefs = readFileSync(schemaPath, { encoding: 'utf-8' });

const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
    throw new Error("One or more required environment variables are undefined: NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD");
}

const driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({
    typeDefs,
    driver,
});

// Building the Neo4j GraphQL schema is an async process
const initServer = async () => {
    console.log("Building GraphQL server");
    return await neoSchema.getSchema();
};


const { handleRequest } = createYoga<{ req: NextApiRequest, res: NextApiResponse }>({
    graphqlEndpoint: "/api/graphql",
    schema: await initServer(),
    fetchAPI: {
        Response: Response,
        Request: Request,
    },
});

export { handleRequest as GET, handleRequest as POST }


// for debug to get see the configurations
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     res.status(200).json({
//         uri: NEO4J_URI,
//         name: NEO4J_USERNAME,
//         cwd: process.cwd(),
//         typeDefs: typeDefs
//     })
// }