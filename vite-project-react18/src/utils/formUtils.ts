export const submitFormData = async (formData: Record<string, any>) => {
    const url = "http://example.com/submit-form-data";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("Response from server:", data);
    } catch (error) {
        console.error("Error submitting form data:", error);
    }
};
