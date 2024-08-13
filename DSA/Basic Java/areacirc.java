import java.util.*;
import java.lang.*;

public class areacirc{
	public static void main(String [] args)
	{
		double r;
		Scanner sc = new Scanner(System.in);
		r = sc.nextDouble();
		System.out.println(circ(r));
		System.out.println(area(r));
	}
	public static double circ(double r)
	{
		return 2*3.14*r;
	}
	public static double area(double r)
	{
		return 3.14 * Math.pow(r,2);
	}
}