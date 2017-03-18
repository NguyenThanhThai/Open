#include <opencv2/opencv.hpp>
#include <opencv2/objdetect/objdetect.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <opencv2/features2d/features2d.hpp>
#include <iostream>
#include<stdio.h>

using namespace cv;
using namespace std;

int main(int, char**) {
	VideoCapture vcap;
	Mat image;
	vector<Rect> faces;
	/*const std::string frontalFace = "haarcascade_frontalface_default.xml";
	const std::string eye = "haarcascade_eye.xml";*/

	CascadeClassifier face_cascade;
	CascadeClassifier eye_cascade;
	face_cascade.load("C:/opencv/data/haarcascades/haarcascade_frontalface_alt2.xml");
	eye_cascade.load("C:/opencv/data/haarcascades/haarcascade_eye.xml");

	// This works on a D-Link CDS-932L
	const string videoStreamAddress = "http://192.168.43.1:8080/video";

	//open the video stream and make sure it's opened
	if (!vcap.open(videoStreamAddress)) {
		cout << "Error opening video stream or file" << endl;
		
		return -1;
	}

	for (;;) {
		if (!vcap.read(image)) {
			cout << "No frame" << endl;
			waitKey();
		}

		imshow("Open!", image);
		face_cascade.detectMultiScale(image, faces, 1.5, 3, 0 | CV_HAAR_SCALE_IMAGE);
		for (size_t i = 0; i<faces.size(); i++) {
			cout << "Detecting Face RN" << endl;
			rectangle(image, faces[i], Scalar(0, 125, 165), 2, 8, 0);
			imshow("Open!", image);
			cin;
		}
		if (faces.size() == 0) {
			cout << "No face detected" << endl;
		}
		waitKey(1);
		//if (cv::waitKey(1) >= 0) break;
	}
}