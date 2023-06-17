export const isAdminOrArtist = ( currentUser ) => {
    return ['ADMIN', 'ARTIST'].includes(currentUser?.role)
}

export const isVendor = ( currentUser ) => {
    return ['VENDOR'].includes(currentUser?.role)
}

export const isPromoter = ( currentUser ) => {
    return ['PROMOTER'].includes(currentUser?.role)
}

export const isAdminOrArtistProfile = ( profile ) => {
    return ['ADMIN', 'ARTIST'].includes(profile?.role)
}

export const isVendorProfile = ( profile ) => {
    return ['VENDOR'].includes(profile?.role)
}

export const isPromoterProfile = ( profile ) => {
    return ['PROMOTER'].includes(profile?.role)
}
