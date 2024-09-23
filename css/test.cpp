#include <iostream>

std::cout << "Description" << " | " << "Quantity" << " | " << "Price" < " | "<< "Category" <<" | " << " Extended Price" std::endl;
float total_price = 0.0;
for (int i=0;i<10;i++){
    
    std::cout << descrition[i] << " | " << quantitiyt[i] << " | " << price[i] < " | "<<category[i] <<" | "<<quantity[i]*price[i]<<std::endl;
    total_price+=price[i];
}
float average_price = total_price/10;