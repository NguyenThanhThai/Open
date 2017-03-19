#include <opencv2/opencv.hpp>
#include <opencv2/objdetect/objdetect.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <opencv2/features2d/features2d.hpp>
#include <iostream>
#include<stdio.h>
#include <windows.h>

using namespace cv;
using namespace std;

bool checkForBurryImage(cv::Mat matImage) {

	cv::Mat finalImage;
	cv::Mat matImageGrey;
	cv::cvtColor(matImage, matImageGrey, CV_BGRA2GRAY);
	matImage.release();

	cv::Mat newEX;
	const int MEDIAN_BLUR_FILTER_SIZE = 15; // odd number
	cv::medianBlur(matImageGrey, newEX, MEDIAN_BLUR_FILTER_SIZE);
	matImageGrey.release();

	cv::Mat laplacianImage;
	cv::Laplacian(newEX, laplacianImage, CV_8U); // CV_8U
	newEX.release();

	cv::Mat laplacianImage8bit;
	laplacianImage.convertTo(laplacianImage8bit, CV_8UC1);
	laplacianImage.release();
	cv::cvtColor(laplacianImage8bit, finalImage, CV_GRAY2BGRA);
	laplacianImage8bit.release();

	int rows = finalImage.rows;
	int cols = finalImage.cols;
	char *pixels = reinterpret_cast<char *>(finalImage.data);
	int maxLap = -16777216;
	for (int i = 0; i < (rows*cols); i++) {
		if (pixels[i] > maxLap)
			maxLap = pixels[i];
	}

	int soglia = -6118750;

	pixels = NULL;
	finalImage.release();

	BOOL isBlur = (maxLap < 115) ? FALSE : TRUE;
	return isBlur;
}

int main(int, char**) {

	VideoCapture vcap;
	Mat image, image_gray, LaplaceImage;
	vector<Rect> faces;
	bool isBlur;
	//Getting current path
	DWORD nBufferLength = MAX_PATH;
	char szCurrentDirectory[MAX_PATH + 1];
	char fileName[] = "\\image.jpg";
	GetCurrentDirectory(nBufferLength, szCurrentDirectory);
	strcat(szCurrentDirectory, fileName);

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

	faceDetection:
		for (;;) {
			if (!vcap.read(image)) {
				cout << "No frame" << endl;
				waitKey();
			}
		imageOpen:
			imshow("Open!", image);
			face_cascade.detectMultiScale(image, faces, 1.5, 3, 0 | CV_HAAR_SCALE_IMAGE);
			for (size_t i = 0; i<faces.size(); i++) {
				size_t value = 1;
				cout << "Detecting Face RN" << endl;
				rectangle(image, faces[i], Scalar(0, 125, 165), 2, 8, 0);
				imshow("Open!", image);
					imwrite(szCurrentDirectory, image);
					isBlur = checkForBurryImage(image);
					if (!isBlur) {
						cout << "Comparing" << endl;
						system("node index.js");
						goto finish;
					}
			}
			if (faces.size() == 0) {
				cout << "No face detected" << endl;
			}
			waitKey(1);
		}

	finish:
		waitKey(0);
}