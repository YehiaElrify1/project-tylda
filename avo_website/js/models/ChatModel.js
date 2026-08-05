/**
 * AVO HealthCare - AI Chat Model
 * Mock knowledge base and interactive scenarios for the Live AI Medical Assistant demo
 */

export const INITIAL_CHAT_MESSAGES = [
  {
    sender: 'bot',
    text: 'Hello, I am the **AVO Clinical AI Assistant**. How may I assist you today? Select a scenario below or enter your symptoms for real-time guidance.',
    timestamp: 'Just now'
  }
];

export const QUICK_PROMPTS = [
  {
    id: 'symptom-headache',
    label: 'Migraine & Eye Strain',
    query: 'I have had a throbbing migraine and blurred vision for 2 days.',
    response: 'Based on your reported symptoms (throbbing headache and blurred vision for 48 hours), this may indicate tension migraine or ocular strain.\n\n**Recommended Next Steps:**\n1. Reduce screen exposure and maintain adequate hydration.\n2. Schedule a clinical consultation with **Dr. Ahmed Mostafa (Neurology)** or **Dr. Sara Khaled (Ophthalmology)**.\n\nWould you like to reserve an available appointment slot?'
  },
  {
    id: 'drug-interaction',
    label: 'Drug Interaction Check',
    query: 'Can I take Ibuprofen with Amoxicillin?',
    response: '**Safety Assessment:**\nThere are no primary pharmacokinetic contraindications between **Ibuprofen** (NSAID) and **Amoxicillin** (Antibiotic).\n\n**Clinical Note:** Take Ibuprofen with meals to minimize gastric discomfort. Complete the prescribed antibiotic course as directed.'
  },
  {
    id: 'lab-analysis',
    label: 'Analyze Blood Test',
    query: 'My Vitamin D level came back as 18 ng/mL. Is that low?',
    response: '**Laboratory Result Analysis:**\nYour Vitamin D level of **18 ng/mL** indicates **Deficiency** (Standard reference range: 30–100 ng/mL).\n\n**Action Plan:**\n- Your physician may prescribe a weekly therapeutic supplement.\n- This finding has been logged to your AVO Health Profile for physician follow-up.'
  },
  {
    id: 'emergency-triage',
    label: 'Chest Tightness Triage',
    query: 'I feel sudden chest pressure and shortness of breath.',
    response: '**CRITICAL TRIAGE ADVISORY:**\nAcute chest pressure accompanied by shortness of breath indicates a high-priority emergency condition.\n\n**Please contact emergency services (123) or proceed immediately to the nearest hospital emergency department.**'
  }
];
