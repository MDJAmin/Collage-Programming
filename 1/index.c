#include <stdio.h>

void calculateRectangle(float width, float height, float *area, float *perimeter) {
    *area = width * height; 
    *perimeter = 2 * (width + height); 
}

int main() {
    float width, height, area, perimeter;
    printf("Enter the width :");
    scanf("%f", &width);
    
    printf("Enter the height :");
    scanf("%f", &height);
    calculateRectangle(width, height, &area, &height)
    printf("Area of the rectangle: %.2f\n", area);
    printf("Perimeter of the rectangle: %.2f\n", perimeter);

    return 0;
}