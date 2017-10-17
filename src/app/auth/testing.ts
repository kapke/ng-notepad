import { AuthenticatedUser } from './AuthenticatedUser'

export function AuthenticatedUserSpy(
    data: Partial<AuthenticatedUser> = {},
): AuthenticatedUser {
    const methodNames = [
        'delete',
        'getIdToken',
        'getToken',
        'linkAndRetrieveDataWithCredential',
        'linkWithCredential',
        'linkWithPhoneNumber',
        'linkWithPopup',
        'linkWithRedirect',
        'reauthenticateAndRetrieveDataWithCredential',
        'reauthenticateWithCredential',
        'reauthenticateWithPhoneNumber',
        'reauthenticateWithPopup',
        'reauthenticateWithRedirect',
        'reload',
        'sendEmailVerification',
        'toJSON',
        'unlink',
        'updateEmail',
        'updatePassword',
        'updatePhoneNumber',
        'updateProfile',
    ]

    return Object.assign(
        jasmine.createSpyObj('authenticatedUser', methodNames),
        data,
    )
}
