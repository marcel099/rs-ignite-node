import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "../utils/dynamodbClient";

interface IUserCertificate {
  id: string;
  name: string;
  grade: string;
  created_at: number;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  const response = await document
    .query({
      TableName: "users_certificate",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      }
    })
    .promise();

  const userCertificate = response.Items[0] as IUserCertificate;

  if (userCertificate) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Certificado válido",
        name: userCertificate.name,
        url: `http://certificate.s3.amazonaws.com/${id}.pdf`
      }),
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Certificado inválido",
    }),
  }
};