
// Basic manual test runner for UPI logic
import { parseUpiUrl } from './parseUpiPayload';
import { buildUpiIntent } from './buildUpiIntent';

function runTest() {
    console.log("Running UPI Logic Tests...\n");

    // Test 1: Parse standard UPI URL
    const upiUrl = "upi://pay?pa=merchant@upi&pn=MerchantName&am=100&tn=TestNote";
    const details = parseUpiUrl(upiUrl);

    console.log("Test 1: Parse Standard URL");
    if (details?.pa === 'merchant@upi' && details.pn === 'MerchantName' && details.am === '100') {
        console.log("PASS ✅");
    } else {
        console.error("FAIL ❌", details);
    }

    // Test 2: Build new Intent
    console.log("\nTest 2: Build GPay Intent");
    const gpayLink = buildUpiIntent(details!, 'tez://upi/pay');
    if (gpayLink.startsWith('tez://upi/pay?pa=merchant@upi')) {
        console.log("PASS ✅", gpayLink);
    } else {
        console.error("FAIL ❌", gpayLink);
    }

    // Test 3: Build PhonePe Intent
    console.log("\nTest 3: Build PhonePe Intent");
    const phonePeLink = buildUpiIntent(details!, 'phonepe://pay');
    if (phonePeLink.startsWith('phonepe://pay?pa=merchant@upi')) {
        console.log("PASS ✅", phonePeLink);
    } else {
        console.error("FAIL ❌", phonePeLink);
    }

    // Test 4: Parse Invalid URL
    console.log("\nTest 4: Parse Invalid URL");
    const invalidUrl = "https://google.com";
    const invalidDetails = parseUpiUrl(invalidUrl);
    if (invalidDetails === null) {
        console.log("PASS ✅");
    } else {
        console.error("FAIL ❌", invalidDetails);
    }
}

runTest();
