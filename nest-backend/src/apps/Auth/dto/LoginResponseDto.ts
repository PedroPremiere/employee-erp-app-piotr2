import { ApiProperty } from '@nestjs/swagger';

import { User } from '@/apps/User/entities/User';

export class LoginResponseDto {
    @ApiProperty({
        description: 'Logged user data',
        example: {
            id: '068f878f-35c7-49c3-9fd7-f5d2b10f1004',
            email: 'Sally_Lind61@example.com',
            createdAt: '2023-05-24T13:46:25.000Z',
            updatedAt: '2023-05-24T13:46:25.000Z'
        }
    })
    user: User;

    @ApiProperty({
        description: 'JWT Access Token',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    })
    access_token: string;
}
