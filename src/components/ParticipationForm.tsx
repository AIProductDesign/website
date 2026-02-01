import { useState } from 'react';
import { ArrowRight, Loader } from 'lucide-react';

export function ParticipationForm() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        motivation: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim() || !formData.company.trim() || !formData.email.trim() || !formData.motivation.trim()) {
            setErrorMessage('Vul alstublieft alle verplichte velden in');
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            // Send form data using FormSubmit service
            const response = await fetch('https://formsubmit.co/jelle.saldien@uantwerpen.be', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    company: formData.company,
                    email: formData.email,
                    phone: formData.phone || 'Niet ingevuld',
                    motivation: formData.motivation,
                    _subject: `Nieuwe aanmelding: ${formData.company}`,
                    _template: 'table'
                })
            });

            if (!response.ok) {
                throw new Error('Formulier kon niet worden verzonden');
            }

            setSubmitStatus('success');
            setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                motivation: ''
            });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Er is een fout opgetreden');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4">
                <h3 className="text-2xl font-semibold">Meld uw bedrijf aan</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Naam <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Uw volledige naam"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        required
                    />
                </div>

                {/* Company */}
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Bedrijf <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Naam van uw bedrijf"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-mailadres <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="uw.email@bedrijf.be"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefoonnummer
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+32 (0)..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                </div>

                {/* Motivation */}
                <div>
                    <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                        Motivatie & Interesse <span className="text-red-600">*</span>
                    </label>
                    <textarea
                        id="motivation"
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleChange}
                        placeholder="Waarom wilt u aan dit project deelnemen? Wat zijn uw verwachtingen?"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                        required
                    />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-700 font-medium">
                            ✓ Bedankt! Uw aanmelding is ontvangen. We nemen snel contact op.
                        </p>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 font-medium">{errorMessage}</p>
                    </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin" />
                                <span>Verzenden...</span>
                            </>
                        ) : (
                            <>
                                <span>Verzend aanmelding</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
