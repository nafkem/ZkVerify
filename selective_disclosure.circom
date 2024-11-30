pragma circom 2.0.0;

template ComparisonCheck() {
    signal input value;        // The value to check
    signal input threshold1;   // First threshold (e.g., lower bound or comparison value)
    signal input threshold2;   // Second threshold (optional, e.g., upper bound)
    signal input operation;    // Operation type: 0=greater than, 1=less than, 2=equal, 3=range check

    signal output isValid;

    if (operation == 0) {
        isValid <== value >= threshold1;
    } else if (operation == 1) {
        isValid <== value <= threshold1;
    } else if (operation == 2) {
        isValid <== value == threshold1;
    } else if (operation == 3) {
        isValid <== value >= threshold1 && value <= threshold2;
    } else {
        isValid <== 0; // Invalid operation
    }
}

component main = ComparisonCheck();
