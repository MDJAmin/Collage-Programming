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

#include <stdio.h>
#include <math.h>

void calculate_circle_properties(double radius, double *circumference, double *area) {
    *circumference = 2 * M_PI * radius; 
    *area = M_PI * (radius * radius);    
}

int main() {
    double radius;
    double circumference, area;

    printf("لطفاً شعاع دایره را وارد کنید: ");
    
    scanf("%lf", &radius); 

    calculate_circle_properties(radius, &circumference, &area); 

    printf("محیط دایره: %lf\n", circumference);
    printf("مساحت دایره: %lf\n", area);        

    return 0;
}
