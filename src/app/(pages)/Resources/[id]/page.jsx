"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import resources from '../resources'; 
import { cppContent } from '@/lib/cpp-content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

function ResourceDetail() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const resource = resources.find((res) => res.id === parseInt(id));

    useEffect(() => {
        if (!resource) {
            router.push('/404');
        }
    }, [resource, router]);

    if (!resource) {
        return null;
    }

    const isCppTrack = resource.id === 4;

    // Solution Dialog Component
    const SolutionDialog = ({ solution }) => {
        if (!solution) return null;
        
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                        View Solution
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Solution</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-white">
                                <code>{solution.code}</code>
                            </pre>
                        </div>
                        <div className="text-gray-700">
                            <h4 className="font-semibold mb-2">Explanation:</h4>
                            <p>{solution.explanation}</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    };

    // Exercise Card Component
    const ExerciseCard = ({ exercise }) => (
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-blue-600">
                    {exercise.title}
                </h3>
                <Badge 
                    variant="outline" 
                    className={`
                        ${exercise.difficulty === 'Easy' ? 'bg-green-50 text-green-700' : ''}
                        ${exercise.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700' : ''}
                        ${exercise.difficulty === 'Hard' ? 'bg-red-50 text-red-700' : ''}
                        ${exercise.difficulty === 'Expert' ? 'bg-purple-50 text-purple-700' : ''}
                    `}
                >
                    {exercise.difficulty}
                </Badge>
            </div>
            <p className="text-gray-700 mb-4">{exercise.description}</p>
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Hints:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        {exercise.hints.map((hint, hintIndex) => (
                            <li key={hintIndex} className="text-gray-600">
                                {hint}
                            </li>
                        ))}
                    </ul>
                </div>
                <SolutionDialog solution={exercise.solution} />
            </div>
        </div>
    );

    return (
        <section className="bg-gray-50 text-black min-h-screen">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-16">
                <div className="max-w-screen-lg mx-auto px-8">
                    <h1 className="text-5xl font-bold mb-4">{resource.title}</h1>
                    <p className="text-lg text-blue-200">{resource.description}</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-screen-lg mx-auto p-8">
                {isCppTrack ? (
                    <Tabs defaultValue="introduction" className="w-full">
                        <TabsList className="grid w-full grid-cols-5 mb-8">
                            <TabsTrigger value="introduction">Introduction</TabsTrigger>
                            <TabsTrigger value="examples">Examples</TabsTrigger>
                            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                            <TabsTrigger value="practice">Practice</TabsTrigger>
                        </TabsList>

                        {/* Introduction Tab */}
                        <TabsContent value="introduction">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Introduction to C++</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        {resource.extendedContent}
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Examples Tab */}
                        <TabsContent value="examples">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Code Examples</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {cppContent.examples.map((example, index) => (
                                        <div key={index} className="bg-gray-50 p-6 rounded-lg">
                                            <h3 className="text-xl font-semibold mb-4">{example.title}</h3>
                                            <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto mb-4">
                                                <code>{example.code}</code>
                                            </pre>
                                            <p className="text-gray-600">{example.explanation}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </TabsContent>

{/* Roadmap Tab */}
<TabsContent value="roadmap">
    <div className="space-y-8">
        {cppContent.roadmap.map((section, index) => (
            <Card key={index}>
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-blue-600">
                        {section.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">{section.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.topics.map((topic, topicIndex) => (
                            <div 
                                key={topicIndex}
                                className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border border-gray-100"
                            >
                                <Badge 
                                    variant="outline" 
                                    className="bg-blue-50 min-w-[24px] text-center"
                                >
                                    {topicIndex + 1}
                                </Badge>
                                <span className="text-gray-700">{topic}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
</TabsContent>

{/* Resources Tab */}
<TabsContent value="resources">
    <div className="space-y-8">
        {/* Documentation Section */}
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Documentation & References
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {cppContent.resources.documentation.map((doc, index) => (
                        <div key={index} className="flex flex-col p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-blue-600">
                                    {doc.title}
                                </h3>
                                <Badge variant="outline">{doc.type}</Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{doc.description}</p>
                            <a 
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Visit Resource →
                            </a>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Tutorials Section */}
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Online Tutorials & Courses
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {cppContent.resources.tutorials.map((tutorial, index) => (
                        <div key={index} className="flex flex-col p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-blue-600">
                                    {tutorial.title}
                                </h3>
                                <Badge variant="outline">{tutorial.type}</Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{tutorial.description}</p>
                            <a 
                                href={tutorial.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Start Learning →
                            </a>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Video Resources */}
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Video Tutorials
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {cppContent.resources.videos.map((video, index) => (
                        <div key={index} className="flex flex-col p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-blue-600">
                                    {video.title}
                                </h3>
                                <Badge variant="outline">{video.platform}</Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{video.description}</p>
                            <a 
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Watch Now →
                            </a>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Books Section */}
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Recommended Books
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {cppContent.resources.books.map((book, index) => (
                        <div key={index} className="flex flex-col p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-blue-600">
                                    {book.title}
                                </h3>
                                <Badge variant="outline">{book.level}</Badge>
                            </div>
                            <p className="text-gray-600 mb-1">By {book.author}</p>
                            <p className="text-gray-600">{book.description}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Practice Platforms */}
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Practice Platforms
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {cppContent.resources.practice.map((platform, index) => (
                        <div key={index} className="flex flex-col p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-blue-600">
                                    {platform.title}
                                </h3>
                                <Badge variant="outline">{platform.type}</Badge>
                            </div>
                            <p className="text-gray-600 mb-2">{platform.description}</p>
                            <a 
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Start Practicing →
                            </a>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
</TabsContent>
                        {/* Practice Tab */}
                        <TabsContent value="practice">
                            <div className="space-y-8">
                                {/* Beginner Exercises */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                            Beginner Exercises
                                            <Badge variant="outline" className="bg-green-50 text-green-700">
                                                Easy
                                            </Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            {cppContent.practice.beginnerExercises.map((exercise, index) => (
                                                <ExerciseCard key={index} exercise={exercise} />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Intermediate Exercises */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                            Intermediate Exercises
                                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                                Medium
                                            </Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            {cppContent.practice.intermediateExercises.map((exercise, index) => (
                                                <ExerciseCard key={index} exercise={exercise} />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Advanced Exercises */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                            Advanced Exercises
                                            <Badge variant="outline" className="bg-red-50 text-red-700">
                                                Hard
                                            </Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            {cppContent.practice.advancedExercises.map((exercise, index) => (
                                                <ExerciseCard key={index} exercise={exercise} />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Challenge Problems */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                            Challenge Problems
                                            <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                                Expert
                                            </Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            {cppContent.practice.challengeProblems.map((exercise, index) => (
                                                <ExerciseCard key={index} exercise={exercise} />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* ... Other tabs content ... */}
                    </Tabs>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>In-Depth Roadmap</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {resource.extendedContent}
                            </p>
                        </CardContent>
                    </Card>
                )}

                <div className="mt-12 text-center">
                    <Button
                        onClick={() => router.push('/Resources')}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Explore More Resources
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default ResourceDetail;