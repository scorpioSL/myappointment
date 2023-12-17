import { Response } from 'express';


export function mockResponse(): Response {
    const statusResponseMock = {
        send: jest.fn((x) => x),
    }
    const responseMock = {
        status: jest.fn((x) => statusResponseMock),
        send: jest.fn((x) => x),
    } as unknown as Response

    return responseMock;
}