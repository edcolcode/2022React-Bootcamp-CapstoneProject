/**
 * Converts the value to number and check it is between the available threshold
 * build from the min and max values.
 * If non-valid number is provided as value, this uses the default value as fallback.
 * 
 * @param {string | number} value the value to validate.
 * @param {number} defaultValue default value used as fallback.
 * @param {number} minValue lowest posible value.
 * @param {number} maxValue greatest posible value.
 * @returns {number} the value.
 */
export const getValidNumberInRange = (value, defaultValue, minValue, maxValue) => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
        return defaultValue;
    } else if (numberValue > maxValue) {
        return maxValue;
    } else if (numberValue < minValue) {
        return minValue;
    } 

    return numberValue;
};