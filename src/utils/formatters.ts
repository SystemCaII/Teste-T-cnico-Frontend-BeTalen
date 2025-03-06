export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  export const formatPhone = (phone: string): string => {
    
    const cleanedPhone = phone.replace(/\D/g, '');
  
    
    if (cleanedPhone.length === 13) {
      return `+${cleanedPhone.slice(0, 2)} (${cleanedPhone.slice(2, 4)}) ${cleanedPhone.slice(4, 9)}-${cleanedPhone.slice(9)}`;
    }
    
   
    return phone;
  };
  
  
  