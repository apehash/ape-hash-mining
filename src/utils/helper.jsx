import moment from 'moment'


export const trimAddress = (addr) => {
    try {
        if (!addr) return '';
        return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
    }
    catch (err) {
        return addr;
    }
}

export function formatPrice(
    value,
    decimals = 4
) {
    if (isNaN(value)) return '0';

    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
    }).format(value);
}

export const formatDate = (timestamp, format = '') => {
    try {
        if (format) {
            return moment(timestamp * 1000).format(format);
        } else {
            return moment(timestamp * 1000).format('DD-MM-YYYY');
        }
    } catch (err) {
        console.error(err.message);
        return false;
    }
};

export const getDaysLeft = (timestamp) => {
    const now = Date.now(); // current time in milliseconds
    const target = timestamp * 1000; // assuming input timestamp is in seconds

    const timeDiff = target - now;

    if (timeDiff <= 0) return 0;

    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft;
};


export const extractRevertReason = (error) => {
    const raw = error?.reason || error?.message || "Transaction failed";

    // Remove the 0x-prefixed ABI-encoded part if it exists
    const cleaned = raw.split("0x")[0]?.trim();

    return cleaned.endsWith(":") ? cleaned.slice(0, -1).trim() : cleaned;
}
