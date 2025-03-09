# Coffee Payment App Documentation

## Overview
This application provides a customizable "Buy Me a Coffee" style payment button creator. Users can create personalized payment buttons, customize their appearance, and generate shareable preview cards for social media.

## Architecture

### Components
1. **ConfigurationForm**
   - Handles user configuration input
   - Manages button styling and thank you page customization
   - Validates input and provides real-time feedback

2. **PreviewCard**
   - Displays live preview of payment button
   - Shows social media preview card
   - Provides sharing functionality for Twitter and LinkedIn

3. **PaymentButton**
   - Handles payment interaction
   - Manages redirect flow

4. **ThankYouPage**
   - Customizable thank you message
   - Optional confetti animation
   - Displays transaction success message

### Data Flow
1. User inputs configuration in ConfigurationForm
2. Configuration is saved to state
3. PreviewCard updates in real-time
4. Payment button generates unique payment link
5. After payment, user is redirected to custom thank you page

### Types
```typescript
interface ButtonStyle {
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontSize: string;
  padding: string;
  buttonText: string;
}

interface ThankYouPageStyle {
  backgroundColor: string;
  textColor: string;
  message: string;
  showConfetti: boolean;
}

interface UserConfig {
  ensNameOrAddress: string;
  buttonStyle: ButtonStyle;
  thankYouPage: ThankYouPageStyle;
  slug: string;
}
```

## Features

### Customization Options
- Button styling (colors, text, size)
- Thank you page design
- Custom URL slugs
- Social media preview cards

### Social Sharing
- Twitter integration
- LinkedIn integration
- Custom preview cards
- Automatic avatar generation

## Usage

### Configuration
1. Enter ENS name or address
2. Customize button appearance
3. Set up thank you page
4. Generate preview

### Payment Flow
1. User clicks payment button
2. Redirect to custom thank you page
3. Optional confetti animation

### Sharing
1. Preview card generated automatically
2. Share directly to Twitter or LinkedIn
3. Custom preview shows on social media

## Best Practices
- Always validate user input
- Provide real-time preview
- Handle errors gracefully
- Maintain consistent styling
- Ensure responsive design